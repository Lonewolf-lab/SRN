export default function SectionHeader({ hindi, english, lang }) {
  // Active language on top (large), secondary language below (small)
  const primary   = lang === "en" ? english : hindi;
  const secondary = lang === "en" ? hindi   : english;

  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#5C1010] font-serif leading-tight">
        {primary}
      </h2>
      {secondary && (
        <p className="text-lg text-[#7A5C45] mt-1 font-medium">{secondary}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#E8622A] to-[#D4880C]" />
    </div>
  );
}
