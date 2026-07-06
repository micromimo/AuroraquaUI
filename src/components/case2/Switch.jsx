export default function Switch({ checked, onChange }) {
  return (
    <div
      className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer ${
        checked ? "custom-switch-track" : "bg-slate-200/25"
      }`}
      style={
        !checked
          ? {
              background: "rgba(255, 255, 255, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 3px inset",
            }
          : undefined
      }
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200 ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}