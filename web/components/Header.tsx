const Header = ({ name }: any) => {
  return (
    <div
      className="flex justify-center items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg px-8 py-3 my-8"
    >
      <h3 className="text-3xl font-bold text-primary-w">{name}</h3>
    </div>
  );
};

export default Header;
