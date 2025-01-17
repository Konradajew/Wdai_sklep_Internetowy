interface CategoryFilterProps {
    selectedCategory: string;
    categories: string[];
    setSelectedCategory: (category: string) => void;
  }
  
  const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selectedCategory,
    categories,
    setSelectedCategory,
  }) => {
    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '50%',
          }}
        >
          <option value="">Wszystkie kategorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default CategoryFilter;
  