const invitationLink = (uid: string, roomId: string) => {
  // todo: リンク注意
  // const Link = `https://arow-cup.vercel.app/invitation?rid=${roomId}&personId=${uid}`;
  const Link = `http://localhost:3000/invitation?rid=${roomId}&personId=${uid}`;
  return Link;
};
export default invitationLink;
