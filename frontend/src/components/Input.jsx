import React from 'react'

const Input = ({
  icon: Iocn,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props
}) => {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Iocn className="w-5 h-5 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
      />
      {RightIcon && (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={onRightIconClick}
        >
          <RightIcon className="w-5 h-5 text-gray-400 hover:text-green-500" />
        </div>
      )}
    </div>
  );
};

export default Input