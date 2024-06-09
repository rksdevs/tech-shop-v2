const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full lg:max-w-screen-lg mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
