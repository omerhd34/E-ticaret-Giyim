"use client";

export default function AboutSection({ icon: Icon, title, children }) {
 return (
  <section>
   <div className="flex items-center gap-3 mb-4">
    <Icon className="text-indigo-600" size={28} />
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
   </div>
   <div className="space-y-4 text-gray-700 leading-relaxed">
    {children}
   </div>
  </section>
 );
}
