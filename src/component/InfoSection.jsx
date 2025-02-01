const InfoSection = () => {
  return (
    <div className="mt-4 max-w-[378px] ">
      {/* Contact Information */}
      <div className="flex  flex-col md:flex-row bg-gray-100 py-8 px-4 items-center space-y-4 md:space-y-0 md:justify-between mb-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-gem"></i>
          <span>Drop Hint</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-envelope"></i>
          <span>Email</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-phone"></i>
          <span>800.691.0952</span>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mb-4 px-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-truck"></i>
          <span className="text-sm md:text-base">
            Free Shipping, Free Extended Holiday Returns
          </span>
        </div>
      </div>

      {/* Shipping Date Information */}
      <div className="px-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt"></i>
          <span className="text-sm md:text-base">
            Order now and your order ships by Thu, Dec 19, depending on center
            diamond.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
