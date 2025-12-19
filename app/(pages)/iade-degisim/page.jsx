"use client";
import { useState } from "react";
import ReturnExchangeHeader from "@/app/components/return-exchange/ReturnExchangeHeader";
import ReturnTab from "@/app/components/return-exchange/ReturnTab";
import ExchangeTab from "@/app/components/return-exchange/ExchangeTab";
import ContactCTA from "@/app/components/return-exchange/ContactCTA";
import ImportantNotes from "@/app/components/return-exchange/ImportantNotes";

export default function IadeDegisimPage() {
 const [activeTab, setActiveTab] = useState("iade");

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4">
    <ReturnExchangeHeader activeTab={activeTab} onTabChange={setActiveTab} />
    {activeTab === "iade" && <ReturnTab />}
    {activeTab === "degisim" && <ExchangeTab />}
    <ContactCTA />
    <ImportantNotes />
   </div>
  </div>
 );
}