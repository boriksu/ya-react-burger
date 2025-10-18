import type { Middleware, MiddlewareAPI } from "redux";
import { refreshToken } from "../data/api/auth";
import { getCookie } from "../data/api/useCookie";
import type {
  AppDispatch,
  RootState,
  webSocketActionsTypes,
} from "../data/types/types";

interface WebSocketState {
  socket: WebSocket | null;
  reconnectTimer: number;
  isConnected: boolean;
  url: string;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
}

export const MESSAGE_LOADING = "Подождите, идет загрузка...";
export const MESSAGE_ERROR = "Возникла ошибка при получении данных";

const getEventMessage = (e: Event) => {
  if (e instanceof ErrorEvent) {
    return e.message;
  } else if (e instanceof CloseEvent) {
    return `${e.code} ${e.reason}`;
  }

  return `Ошибка ${e.type}: ${JSON.stringify(
    e,
    Object.getOwnPropertyNames(e)
  )}`;
};

export const socketMiddleware = (
  wsActions: webSocketActionsTypes
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    const state: WebSocketState = {
      socket: null,
      reconnectTimer: 0,
      isConnected: false,
      url: "",
      reconnectAttempts: 0,
      maxReconnectAttempts: 10,
    };

    const connect = (
      url: string,
      dispatch: AppDispatch,
      addToken?: boolean
    ) => {
      try {
        let finalUrl = url;
        if (addToken) {
          finalUrl += `?token=${getCookie("accessToken")}`;
        }

        state.socket = new WebSocket(finalUrl);
        state.url = finalUrl;
        state.isConnected = true;
        state.reconnectAttempts = 0;

        setupEventHandlers(dispatch);

        dispatch({ type: wsActions.onSuccess } as any);
      } catch (error) {
        handleReconnect(dispatch);
      }
    };

    const disconnect = (dispatch: AppDispatch) => {
      cleanup();
      state.isConnected = false;
      dispatch({ type: wsActions.onClosed } as any);
    };

    const cleanup = () => {
      window.clearTimeout(state.reconnectTimer);
      state.socket?.close();
      state.socket = null;
      state.reconnectTimer = 0;
    };

    const handleReconnect = (dispatch: AppDispatch) => {
      if (state.reconnectAttempts < state.maxReconnectAttempts) {
        state.reconnectAttempts++;
        state.reconnectTimer = window.setTimeout(() => {
          connect(state.url, dispatch, false);
        }, 3000);
      }
    };

    const handleMessage = (data: any, dispatch: AppDispatch) => {
      if (!data?.success) {
        if (data?.message === "Invalid or missing token") {
          refreshToken();
        }
        dispatch({ type: wsActions.onError, error: data?.message } as any);
      } else {
        const { success, ...restData } = data;
        dispatch({ type: wsActions.onMessage, message: restData } as any);
      }
    };

    const setupEventHandlers = (dispatch: AppDispatch) => {
      if (!state.socket) return;

      state.socket.onopen = () => {
        dispatch({ type: wsActions.onOpen } as any);
      };

      state.socket.onclose = (event) => {
        if (event.code !== 1000) {
          dispatch({
            type: wsActions.onError,
            error: getEventMessage(event),
          } as any);
        }
        if (state.isConnected) {
          dispatch({ type: wsActions.onClosed } as any);
          handleReconnect(dispatch);
        }
      };

      state.socket.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          handleMessage(parsedData, dispatch);
        } catch (error) {
          dispatch({
            type: wsActions.onError,
            error: "Invalid JSON format",
          } as any);
        }
      };

      state.socket.onerror = (event) => {
        dispatch({
          type: wsActions.onError,
          error: getEventMessage(event),
        } as any);
      };
    };

    return (next) => (action: any) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        cleanup();
        connect(action.url, dispatch, action.addToken);
      }

      if (action.type === wsActions.onDisconnect && state.socket) {
        disconnect(dispatch);
      }

      next(action);
    };
  };
};
