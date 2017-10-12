/**
 * For use with window.fetch
 */
export function jsonHeader(options = {}) {
  return Object.assign(options, {
    'Content-Type': 'application/json',
  });
}

export function corsRequest(options = {}) {
  return Object.assign(options, {
    mode: 'cors',
    headers: Object.assign((options.headers || {}), jsonHeader()),
  });
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}