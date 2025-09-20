export function setCookie(name, value, options = {}) {
  const settings = {
    path: "/",
    ...options,
  };

  let expires = settings.expires;

  if (typeof expires === "number" && expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    expires = settings.expires = date;
  }

  if (expires && expires.toUTCString) {
    settings.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let cookieString = `${name}=${value}`;

  for (const [key, val] of Object.entries(settings)) {
    cookieString += `; ${key}`;
    if (val !== true) {
      cookieString += `=${val}`;
    }
  }

  document.cookie = cookieString;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
    expires: new Date(0),
  });
}
