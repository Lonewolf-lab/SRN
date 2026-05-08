import { BookOpen, Heart, Users, Star, Leaf, Home } from "lucide-react";

const icons = { BookOpen, Heart, Users, Star, Leaf, Home };

export default function ObjectiveCard({ iconName, titleHindi, title, desc }) {
  const Icon = icons[iconName] || BookOpen;
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E8D5C4] hover:border-[#DE7852] hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <Icon className="w-8 h-8 text-[#DE7852] mb-3" />
      <h3 className="font-bold text-[#2C1A0E] text-base">{titleHindi}</h3>
      <p className="text-xs text-[#7A5C45] mt-0.5 mb-2">{title}</p>
      <p className="text-sm text-[#7A5C45]">{desc}</p>
    </div>
  );
}
