"use client";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import BrandFilter from "./BrandFilter";

export default function CategoryFiltersSidebar({
 slug,
 filters,
 availableSizes,
 availableBrands,
 onClearFilters,
 onMinPriceChange,
 onMaxPriceChange,
 onSizeToggle,
 onBrandToggle,
}) {
 const showSizeFilter = slug.length > 0 && decodeURIComponent(slug[0]) !== "aksesuar";

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

    {showSizeFilter && (
     <SizeFilter
      availableSizes={availableSizes}
      selectedSizes={filters.sizes}
      onSizeToggle={onSizeToggle}
     />
    )}

    <BrandFilter
     availableBrands={availableBrands}
     selectedBrands={filters.brands}
     onBrandToggle={onBrandToggle}
    />
   </div>
  </aside>
 );
}
