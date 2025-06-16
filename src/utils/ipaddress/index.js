export async function getLocalIPs() {
  const ips = [];
  const pc = new RTCPeerConnection();
  pc.createDataChannel('');
  pc.createOffer().then((offer) => pc.setLocalDescription(offer));

  pc.onicecandidate = (event) => {
    if (!event.candidate) return;
    const parts = event.candidate.candidate.split(' ');
    const ip = parts[4];
    if (!ips.includes(ip)) ips.push(ip);
  };

  return new Promise((resolve) => setTimeout(() => resolve(ips), 500));
}
