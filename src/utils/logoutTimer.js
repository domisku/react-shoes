export default function logoutTimer() {
  const expirationTime = localStorage.getItem("expirationTime");
  const currentTime = new Date().getTime();

  if (expirationTime) {
    const remainingTime = expirationTime - currentTime;
    
    if (remainingTime <= 0) localStorage.clear();
    else setTimeout(() => localStorage.clear(), remainingTime);
  }
}
