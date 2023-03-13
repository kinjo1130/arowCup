const invitationLink = (uid: string, roomId: string) => {
  // todo: リンク注意
  const Link = `https://arow-cup.vercel.app/?rid=${roomId}&personId=${uid}`;
  return Link;
};
export default invitationLink;
