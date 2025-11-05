import React from 'react';

const Select = ({ label, options = [], className = '', ...props }) => {
  return (
    <div data-easytag="id1-react/src/components/ui/Select.jsx" className="w-full">
      {label && (
        <label data-easytag="id2-react/src/components/ui/Select.jsx" className="block mb-1 text-sm text-muted">
          {label}
        </label>
      )}
      <select
        data-easytag="id3-react/src/components/ui/Select.jsx"
        className={`w-full rounded-xl border border-line bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option data-easytag={`id4-${idx}-react/src/components/ui/Select.jsx`} key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
