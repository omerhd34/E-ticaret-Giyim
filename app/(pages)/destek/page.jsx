import SupportHeader from "@/app/components/support/SupportHeader";
import ContactInfoSection from "@/app/components/support/ContactInfoSection";
import QuickHelpSection from "@/app/components/support/QuickHelpSection";
import ContactForm from "@/app/components/support/ContactForm";
import FAQSection from "@/app/components/support/FAQSection";

export default function DestekPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4">
    <SupportHeader />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     <div className="lg:col-span-1 space-y-6">
      <ContactInfoSection />
      <QuickHelpSection />
     </div>

     <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-md p-8">
       <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
       <ContactForm />
      </div>

      <div className="mt-8">
       <FAQSection />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
