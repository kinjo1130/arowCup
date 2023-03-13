/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import Image from 'next/image';
import logout from '../hooks/useLogout';

type Props = {
  title: string;
  imgSrc?: string;
  userName?: string;
};
function Header(props: Props) {
  const { title, imgSrc } = props;
  return (
    <header className="bg-gray-800">
      <div className="max-w-7xl mx-auto flex flex-row justify-between py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {imgSrc && (
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            <Image src={imgSrc} alt="ユーザの写真" width={50} height={50} />
          </button>
        )}
      </div>
    </header>
  );
}
export default Header;
