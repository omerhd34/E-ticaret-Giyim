"use client";

export default function PolicySection({ icon, title, children }) {
 return (
  <section>
   {title && (
    <div className="flex items-center gap-3 mb-4">
     {icon}
     <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
   )}
   <div className="space-y-4 text-gray-700">
    {children}
   </div>
  </section>
 );
}
