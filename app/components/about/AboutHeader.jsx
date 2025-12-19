"use client";
import { HiUsers } from "react-icons/hi";

export default function AboutHeader() {
 return (
  <div className="text-center mb-12">
   <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
    <HiUsers className="text-indigo-600" size={40} />
   </div>
   <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
    Biz Kimiz?
   </h1>
   <p className="text-gray-600 text-lg max-w-2xl mx-auto">
    Erkek giyim dünyasında kalite, stil ve müşteri memnuniyetini bir araya getiren bir e-ticaret platformuyuz.
   </p>
  </div>
 );
}
