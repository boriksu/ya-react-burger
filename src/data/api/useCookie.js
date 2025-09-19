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
  const pattern = new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1")}=([^;]*)`
  );
  const match = document.cookie.match(pattern);

  return match ? decodeURIComponent(match[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
    expires: new Date(0),
  });
}
