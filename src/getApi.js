export default function getApi() {
  const isTesting = false;
  return isTesting
    ? "http://localhost:3000/"
    : "https://guess-a-sketch-service.azurewebsites.net/";
}
