"use client";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function CategoryFiltersSidebar({
 slug,
 filters,
 availableBrands,
 onClearFilters,
 onMinPriceChange,
 onMaxPriceChange,
 onBrandToggle,
}) {

 return (
  <aside className="hidden lg:block w-72 shrink-0">
   <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
    <div className="flex justify-between items-center mb-6">
     <h3 className="font-bold text-lg">Filtreler</h3>
     <button
      onClick={onClearFilters}
      className="text-sm text-indigo-600 hover:text-indigo-800"
     >
      Temizle
     </button>
    </div>

    <SubCategoryFilter slug={slug} />

    <PriceFilter
     minPrice={filters.minPrice}
     maxPrice={filters.maxPrice}
     onMinPriceChange={onMinPriceChange}
     onMaxPriceChange={onMaxPriceChange}
    />

    <BrandFilter
     availableBrands={availableBrands}
     selectedBrands={filters.brands}
     onBrandToggle={onBrandToggle}
    />
   </div>
  </aside>
 );
}
