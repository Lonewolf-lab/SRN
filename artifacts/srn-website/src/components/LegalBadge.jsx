export default function LegalBadge({ label }) {
  return (
    <span className="bg-[#FFF9F2] border border-[#E8622A]/40 hover:border-[#E8622A] rounded-full px-5 py-2 text-[#5C1010] font-medium text-sm hover:bg-[#FFF0E6] hover:shadow-sm transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}
