import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface CourseFilterProps {
  onFilterChange: (filters: {
    search: string;
    level: string;
    priceRange: string;
  }) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange({
      search: newSearch,
      level,
      priceRange
    });
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    onFilterChange({
      search,
      level: value,
      priceRange
    });
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    onFilterChange({
      search,
      level,
      priceRange: value
    });
  };

  return (
    <motion.div 
      className="mb-8 bg-[#1e1e1e] rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#64ffda] text-gray-200 pr-10"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={level} onValueChange={handleLevelChange}>
            <SelectTrigger className="w-[200px] bg-[#121212] border border-gray-700">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border border-gray-700">
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceRange} onValueChange={handlePriceRangeChange}>
            <SelectTrigger className="w-[200px] bg-[#121212] border border-gray-700">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border border-gray-700">
              <SelectItem value="">All Prices</SelectItem>
              <SelectItem value="0-10000">₹0 - ₹10,000</SelectItem>
              <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
              <SelectItem value="15000+">₹15,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseFilter;
