export const Loader = ({ height, grow = false }) => {
  return (
    <div
      className={
        grow
          ? `spinner-grow justify-content-center`
          : `spinner-border justify-content-center`
      }
      role="status"
      style={{ width: height, height: height }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
