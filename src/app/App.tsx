import { useState, useEffect } from 'react';
import { Search, Clock, Users, ChefHat, Heart, Star, Menu, X, Home, BookOpen, Calendar, ShoppingCart, Moon, Sun, Flame, Zap, Cookie, Plus, Trash2, UtensilsCrossed } from 'lucide-react';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  rating: number;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: NutritionInfo;
}

interface MealPlan {
  [key: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1693820206848-6ad84857832a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pasta",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    description: "A rich and creamy pasta dish with roasted garlic and fresh herbs",
    ingredients: ["400g pasta", "6 cloves garlic", "1 cup heavy cream", "1/2 cup parmesan cheese", "Fresh basil", "Salt and pepper"],
    instructions: ["Boil pasta according to package directions", "Roast garlic until golden", "Combine cream and garlic in pan", "Add cooked pasta and toss", "Top with parmesan and basil"],
    nutrition: { calories: 520, protein: 18, carbs: 65, fat: 22, fiber: 3 }
  },
  {
    id: 2,
    name: "Mediterranean Pasta Bowl",
    image: "https://images.unsplash.com/photo-1693820206774-d4a769355142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pasta",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    description: "Fresh Mediterranean flavors with tomatoes, olives, and feta",
    ingredients: ["350g penne pasta", "Cherry tomatoes", "Kalamata olives", "Feta cheese", "Olive oil", "Fresh oregano"],
    instructions: ["Cook pasta until al dente", "Sauté tomatoes in olive oil", "Add olives and seasonings", "Toss with pasta", "Top with crumbled feta"],
    nutrition: { calories: 450, protein: 15, carbs: 58, fat: 18, fiber: 4 }
  },
  {
    id: 3,
    name: "Rainbow Buddha Bowl",
    image: "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Healthy",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.9,
    description: "Colorful and nutritious bowl packed with fresh vegetables",
    ingredients: ["Mixed greens", "Quinoa", "Chickpeas", "Avocado", "Red cabbage", "Tahini dressing"],
    instructions: ["Cook quinoa and let cool", "Prepare all vegetables", "Arrange in bowl", "Add chickpeas and avocado", "Drizzle with tahini dressing"],
    nutrition: { calories: 380, protein: 12, carbs: 45, fat: 16, fiber: 11 }
  },
  {
    id: 4,
    name: "Fresh Garden Salad",
    image: "https://images.unsplash.com/photo-1578657084274-03b9d153b0dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Healthy",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    description: "Crisp and refreshing salad with seasonal vegetables",
    ingredients: ["Mixed lettuce", "Cucumber", "Cherry tomatoes", "Red onion", "Olive oil", "Lemon juice"],
    instructions: ["Wash and dry all vegetables", "Chop into bite-size pieces", "Mix in large bowl", "Whisk dressing ingredients", "Toss and serve immediately"],
    nutrition: { calories: 120, protein: 3, carbs: 15, fat: 7, fiber: 5 }
  },
  {
    id: 5,
    name: "Decadent Chocolate Cake",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Dessert",
    cookTime: "60 min",
    servings: 8,
    difficulty: "Medium",
    rating: 5.0,
    description: "Rich, moist chocolate cake with smooth ganache frosting",
    ingredients: ["2 cups flour", "1 3/4 cups sugar", "3/4 cup cocoa powder", "3 eggs", "1 cup milk", "Dark chocolate for ganache"],
    instructions: ["Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients and combine", "Pour into prepared pans", "Bake 30-35 minutes and frost"],
    nutrition: { calories: 480, protein: 7, carbs: 68, fat: 22, fiber: 3 }
  },
  {
    id: 6,
    name: "Chocolate Bundt Delight",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Dessert",
    cookTime: "50 min",
    servings: 10,
    difficulty: "Medium",
    rating: 4.7,
    description: "Elegant chocolate bundt cake perfect for any occasion",
    ingredients: ["3 cups flour", "2 cups sugar", "1 cup cocoa", "4 eggs", "Butter", "Powdered sugar for dusting"],
    instructions: ["Grease bundt pan thoroughly", "Mix batter until smooth", "Pour into prepared pan", "Bake until toothpick comes clean", "Cool and dust with sugar"],
    nutrition: { calories: 420, protein: 6, carbs: 62, fat: 18, fiber: 2 }
  },
  {
    id: 7,
    name: "Honey Glazed Pork Chops",
    image: "https://images.unsplash.com/photo-1625477811233-044633d10dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pork",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    description: "Tender pork chops with a sweet and savory honey glaze",
    ingredients: ["4 pork chops", "1/4 cup honey", "2 tbsp soy sauce", "3 cloves garlic", "Fresh thyme", "Olive oil"],
    instructions: ["Season pork chops with salt and pepper", "Sear in hot pan until golden", "Mix honey, soy sauce, and garlic", "Pour glaze over pork chops", "Bake at 375°F for 15-20 minutes"],
    nutrition: { calories: 340, protein: 32, carbs: 18, fat: 15, fiber: 0 }
  },
  {
    id: 8,
    name: "Asian BBQ Pork",
    image: "https://images.unsplash.com/photo-1625144093498-bf62fca631c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pork",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.8,
    description: "Succulent BBQ pork with Asian-inspired marinade",
    ingredients: ["2 lbs pork shoulder", "Hoisin sauce", "Rice vinegar", "Ginger", "Five-spice powder", "Sesame seeds"],
    instructions: ["Marinate pork for 2 hours", "Preheat grill to medium-high", "Grill pork, turning occasionally", "Baste with marinade while cooking", "Let rest and slice thin"],
    nutrition: { calories: 380, protein: 35, carbs: 12, fat: 20, fiber: 1 }
  },
  {
    id: 9,
    name: "Perfect Grilled Steak",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Beef",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.9,
    description: "Juicy grilled steak with herb butter finish",
    ingredients: ["2 ribeye steaks", "Butter", "Fresh rosemary", "Garlic", "Salt and pepper", "Olive oil"],
    instructions: ["Let steaks come to room temperature", "Season generously with salt and pepper", "Grill 4-5 minutes per side", "Top with herb butter", "Rest for 5 minutes before serving"],
    nutrition: { calories: 580, protein: 48, carbs: 2, fat: 42, fiber: 0 }
  },
  {
    id: 10,
    name: "Garlic Butter Steak",
    image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Beef",
    cookTime: "25 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.8,
    description: "Pan-seared steak with rich garlic butter sauce",
    ingredients: ["2 strip steaks", "4 tbsp butter", "4 cloves garlic", "Fresh thyme", "Black pepper", "Sea salt"],
    instructions: ["Pat steaks dry and season", "Sear in hot cast iron pan", "Add butter and garlic to pan", "Baste steaks with melted butter", "Rest and serve with pan sauce"],
    nutrition: { calories: 560, protein: 46, carbs: 3, fat: 40, fiber: 0 }
  },
  {
    id: 11,
    name: "Herb Crusted Beef Roast",
    image: "https://images.unsplash.com/photo-1601356616077-695728ae17cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Beef",
    cookTime: "90 min",
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    description: "Tender beef roast with aromatic herb crust",
    ingredients: ["3 lb beef roast", "Fresh rosemary", "Fresh thyme", "Dijon mustard", "Garlic", "Olive oil"],
    instructions: ["Rub roast with mustard", "Press herbs onto meat", "Sear all sides in hot pan", "Roast at 350°F until desired doneness", "Rest 15 minutes before slicing"],
    nutrition: { calories: 420, protein: 52, carbs: 4, fat: 22, fiber: 1 }
  },
  {
    id: 12,
    name: "Grilled Salmon with Lemon",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Fish",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.8,
    description: "Fresh salmon with bright lemon and herbs",
    ingredients: ["2 salmon fillets", "Fresh lemon", "Dill", "Olive oil", "Garlic", "Salt and pepper"],
    instructions: ["Brush salmon with olive oil", "Season with salt, pepper, and herbs", "Grill skin-side down first", "Flip and cook until flaky", "Serve with lemon wedges"],
    nutrition: { calories: 350, protein: 34, carbs: 2, fat: 22, fiber: 0 }
  },
  {
    id: 13,
    name: "Pan-Seared Sea Bass",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Fish",
    cookTime: "18 min",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7,
    description: "Delicate sea bass with crispy skin",
    ingredients: ["2 sea bass fillets", "Butter", "Lemon", "Capers", "White wine", "Fresh parsley"],
    instructions: ["Score skin and season fish", "Sear skin-side down until crispy", "Flip and cook briefly", "Make lemon-caper butter sauce", "Plate and drizzle with sauce"],
    nutrition: { calories: 280, protein: 30, carbs: 4, fat: 15, fiber: 0 }
  },
  {
    id: 14,
    name: "Baked Cod with Vegetables",
    image: "https://images.unsplash.com/photo-1712334562767-5d366d0c40d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Fish",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    description: "Healthy baked cod with colorful roasted vegetables",
    ingredients: ["4 cod fillets", "Cherry tomatoes", "Zucchini", "Bell peppers", "Olive oil", "Lemon and herbs"],
    instructions: ["Arrange vegetables in baking dish", "Place cod on top", "Drizzle with oil and season", "Bake at 400°F for 20 minutes", "Garnish with fresh herbs"],
    nutrition: { calories: 220, protein: 28, carbs: 12, fat: 8, fiber: 3 }
  },
  {
    id: 15,
    name: "Grilled Chicken Breast",
    image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Chicken",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    description: "Perfectly grilled chicken with herbs and spices",
    ingredients: ["4 chicken breasts", "Olive oil", "Garlic powder", "Paprika", "Fresh herbs", "Lemon juice"],
    instructions: ["Marinate chicken with spices", "Preheat grill to medium-high", "Grill 6-7 minutes per side", "Check internal temperature reaches 165°F", "Rest for 5 minutes before serving"],
    nutrition: { calories: 280, protein: 42, carbs: 2, fat: 12, fiber: 0 }
  },
  {
    id: 16,
    name: "Honey Mustard Chicken",
    image: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Chicken",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    description: "Sweet and tangy chicken with honey mustard glaze",
    ingredients: ["4 chicken thighs", "Honey", "Dijon mustard", "Garlic", "Fresh thyme", "Butter"],
    instructions: ["Mix honey and mustard sauce", "Season chicken with salt and pepper", "Sear chicken skin-side down", "Brush with glaze and bake", "Broil for crispy finish"],
    nutrition: { calories: 320, protein: 36, carbs: 15, fat: 14, fiber: 0 }
  },
  {
    id: 17,
    name: "Crispy Chicken Wings",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Chicken",
    cookTime: "40 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    description: "Extra crispy wings with your choice of sauce",
    ingredients: ["2 lbs chicken wings", "Baking powder", "Salt and pepper", "Hot sauce", "Butter", "Garlic powder"],
    instructions: ["Toss wings with baking powder", "Arrange on wire rack", "Bake at 425°F for 40 minutes", "Toss with sauce while hot", "Serve with celery and ranch"],
    nutrition: { calories: 420, protein: 32, carbs: 4, fat: 30, fiber: 0 }
  },
  {
    id: 18,
    name: "Pasta Soup",
    image: "https://images.unsplash.com/photo-1778079840437-74db44e6edb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Soup",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    description: "Comforting pasta soup with vegetables",
    ingredients: ["Small pasta", "Vegetable broth", "Carrots", "Celery", "Tomatoes", "Fresh herbs"],
    instructions: ["Sauté vegetables in olive oil", "Add broth and bring to boil", "Add pasta and cook until tender", "Season with herbs", "Serve hot with crusty bread"],
    nutrition: { calories: 240, protein: 8, carbs: 42, fat: 5, fiber: 4 }
  },
  {
    id: 19,
    name: "Creamy Pumpkin Soup",
    image: "https://images.unsplash.com/photo-1764015939108-7963106fa73b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Soup",
    cookTime: "30 min",
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    description: "Velvety smooth pumpkin soup with cream",
    ingredients: ["Pumpkin puree", "Heavy cream", "Vegetable broth", "Onion", "Garlic", "Nutmeg"],
    instructions: ["Sauté onion and garlic", "Add pumpkin and broth", "Simmer for 20 minutes", "Blend until smooth", "Stir in cream and serve"],
    nutrition: { calories: 180, protein: 4, carbs: 22, fat: 9, fiber: 3 }
  },
  {
    id: 20,
    name: "Tomato Basil Soup",
    image: "https://images.unsplash.com/photo-1776429054130-480a95531159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Soup",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    description: "Classic tomato soup with fresh basil",
    ingredients: ["Fresh tomatoes", "Fresh basil", "Cream", "Onion", "Garlic", "Olive oil"],
    instructions: ["Roast tomatoes until soft", "Sauté onion and garlic", "Add tomatoes and simmer", "Blend with fresh basil", "Finish with cream"],
    nutrition: { calories: 160, protein: 3, carbs: 18, fat: 8, fiber: 3 }
  },
  {
    id: 21,
    name: "Berry Waffles",
    image: "https://images.unsplash.com/photo-1648071588032-70eaf7292f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Breakfast",
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    description: "Fluffy waffles topped with fresh berries",
    ingredients: ["Flour", "Eggs", "Milk", "Butter", "Fresh berries", "Maple syrup"],
    instructions: ["Mix waffle batter", "Preheat waffle iron", "Cook waffles until golden", "Top with berries", "Drizzle with syrup"],
    nutrition: { calories: 380, protein: 10, carbs: 52, fat: 14, fiber: 3 }
  },
  {
    id: 22,
    name: "Classic Eggs and Toast",
    image: "https://images.unsplash.com/photo-1648071588112-10acf7295463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Breakfast",
    cookTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    rating: 4.5,
    description: "Simple and delicious breakfast staple",
    ingredients: ["Eggs", "Bread", "Butter", "Salt and pepper", "Fresh herbs", "Tomatoes"],
    instructions: ["Toast bread until golden", "Fry or scramble eggs", "Season with salt and pepper", "Plate with sliced tomatoes", "Garnish with herbs"],
    nutrition: { calories: 320, protein: 15, carbs: 28, fat: 16, fiber: 2 }
  },
  {
    id: 23,
    name: "Fluffy Pancakes",
    image: "https://images.unsplash.com/photo-1771757279189-9772eb873d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Breakfast",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.9,
    description: "Light and fluffy pancakes with honey",
    ingredients: ["Flour", "Milk", "Eggs", "Baking powder", "Bananas", "Honey"],
    instructions: ["Mix dry ingredients", "Whisk in wet ingredients", "Cook on griddle until bubbles form", "Flip and cook other side", "Stack and top with fruit and honey"],
    nutrition: { calories: 340, protein: 9, carbs: 58, fat: 8, fiber: 2 }
  },
  {
    id: 24,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1774806189229-ed02b4f77de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pizza",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    description: "Classic Italian pizza with fresh mozzarella",
    ingredients: ["Pizza dough", "Fresh mozzarella", "Tomato sauce", "Fresh basil", "Olive oil", "Salt"],
    instructions: ["Roll out pizza dough", "Spread tomato sauce", "Add torn mozzarella", "Bake at 475°F until crispy", "Top with fresh basil"],
    nutrition: { calories: 480, protein: 18, carbs: 62, fat: 18, fiber: 3 }
  },
  {
    id: 25,
    name: "Pepperoni Pizza",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pizza",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    description: "Classic pepperoni pizza with melted cheese",
    ingredients: ["Pizza dough", "Mozzarella", "Pepperoni", "Tomato sauce", "Oregano", "Parmesan"],
    instructions: ["Stretch pizza dough", "Spread sauce and cheese", "Layer pepperoni on top", "Bake until cheese bubbles", "Sprinkle with oregano"],
    nutrition: { calories: 520, protein: 22, carbs: 58, fat: 22, fiber: 2 }
  },
  {
    id: 26,
    name: "Rustic Artisan Pizza",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Pizza",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Hard",
    rating: 4.9,
    description: "Artisan-style pizza with wood-fired taste",
    ingredients: ["Sourdough pizza dough", "San Marzano tomatoes", "Buffalo mozzarella", "Fresh arugula", "Prosciutto", "Truffle oil"],
    instructions: ["Prepare high-heat oven", "Hand-stretch dough thin", "Add minimal toppings", "Bake at highest temperature", "Finish with fresh arugula"],
    nutrition: { calories: 540, protein: 24, carbs: 60, fat: 24, fiber: 3 }
  },
  {
    id: 27,
    name: "Chicken Adobo",
    image: "https://images.unsplash.com/photo-1596699917234-1c93c61a1083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    description: "Classic Filipino dish with chicken in savory soy-vinegar sauce",
    ingredients: ["Chicken pieces", "Soy sauce", "Vinegar", "Garlic", "Bay leaves", "Black peppercorns"],
    instructions: ["Marinate chicken in soy sauce and vinegar", "Brown chicken in hot pan", "Add garlic, bay leaves, and peppercorns", "Simmer until chicken is tender", "Serve with steamed rice"],
    nutrition: { calories: 320, protein: 38, carbs: 8, fat: 14, fiber: 0 }
  },
  {
    id: 28,
    name: "Sinigang na Baboy",
    image: "https://images.unsplash.com/photo-1583913459026-781129ce061f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "50 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.8,
    description: "Sour tamarind soup with pork and vegetables",
    ingredients: ["Pork belly", "Tamarind paste", "Tomatoes", "Onion", "Radish", "Kangkong (water spinach)"],
    instructions: ["Boil pork until tender", "Add tomatoes and onions", "Stir in tamarind paste", "Add vegetables and simmer", "Season with fish sauce"],
    nutrition: { calories: 280, protein: 22, carbs: 15, fat: 16, fiber: 3 }
  },
  {
    id: 29,
    name: "Lumpia Shanghai",
    image: "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "40 min",
    servings: 8,
    difficulty: "Medium",
    rating: 4.9,
    description: "Crispy Filipino spring rolls filled with pork and vegetables",
    ingredients: ["Ground pork", "Carrots", "Onions", "Spring roll wrappers", "Garlic", "Soy sauce"],
    instructions: ["Mix pork with vegetables and seasonings", "Wrap filling in spring roll wrappers", "Seal edges with water", "Deep fry until golden brown", "Serve with sweet and sour sauce"],
    nutrition: { calories: 180, protein: 10, carbs: 15, fat: 9, fiber: 1 }
  },
  {
    id: 30,
    name: "Pancit Canton",
    image: "https://images.unsplash.com/photo-1530375930097-e957738bc0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "30 min",
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    description: "Stir-fried noodles with meat and vegetables",
    ingredients: ["Pancit canton noodles", "Chicken", "Cabbage", "Carrots", "Soy sauce", "Garlic"],
    instructions: ["Soak noodles in water", "Stir-fry chicken and vegetables", "Add noodles and soy sauce", "Toss until well combined", "Serve with calamansi"],
    nutrition: { calories: 340, protein: 18, carbs: 48, fat: 10, fiber: 3 }
  },
  {
    id: 31,
    name: "Kare-Kare",
    image: "https://images.unsplash.com/photo-1759392773285-0f86affdf1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "90 min",
    servings: 8,
    difficulty: "Hard",
    rating: 4.9,
    description: "Oxtail stew in rich peanut sauce with vegetables",
    ingredients: ["Oxtail", "Peanut butter", "Eggplant", "Bok choy", "String beans", "Bagoong (shrimp paste)"],
    instructions: ["Boil oxtail until tender", "Make peanut sauce", "Add vegetables", "Simmer until vegetables are cooked", "Serve with bagoong and rice"],
    nutrition: { calories: 420, protein: 28, carbs: 18, fat: 26, fiber: 4 }
  },
  {
    id: 32,
    name: "Lechon Kawali",
    image: "https://images.unsplash.com/photo-1688084403060-3594a4b8ff8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "75 min",
    servings: 6,
    difficulty: "Hard",
    rating: 5.0,
    description: "Crispy fried pork belly with tender meat inside",
    ingredients: ["Pork belly", "Salt", "Bay leaves", "Peppercorns", "Garlic", "Cooking oil"],
    instructions: ["Boil pork belly with seasonings", "Let dry completely", "Deep fry until skin is crispy", "Cut into pieces", "Serve with liver sauce"],
    nutrition: { calories: 580, protein: 32, carbs: 2, fat: 48, fiber: 0 }
  },
  {
    id: 33,
    name: "Sisig",
    image: "https://images.unsplash.com/photo-1646821195934-fb7ddb6166ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "40 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    description: "Sizzling pork dish with onions and chili peppers",
    ingredients: ["Pork belly", "Pork liver", "Onions", "Chili peppers", "Calamansi", "Egg"],
    instructions: ["Boil and grill pork until crispy", "Chop into small pieces", "Mix with onions and peppers", "Serve on sizzling plate", "Top with raw egg"],
    nutrition: { calories: 420, protein: 28, carbs: 8, fat: 32, fiber: 1 }
  },
  {
    id: 34,
    name: "Bicol Express",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "35 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.7,
    description: "Spicy pork stew in coconut milk",
    ingredients: ["Pork belly", "Coconut milk", "Shrimp paste", "Chili peppers", "Garlic", "Ginger"],
    instructions: ["Sauté garlic and ginger", "Add pork and cook until brown", "Pour coconut milk and simmer", "Add shrimp paste and chili", "Cook until thick and creamy"],
    nutrition: { calories: 380, protein: 24, carbs: 10, fat: 28, fiber: 2 }
  },
  {
    id: 35,
    name: "Tinola",
    image: "https://images.unsplash.com/photo-1665594051407-7385d281ad76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "40 min",
    servings: 6,
    difficulty: "Easy",
    rating: 4.6,
    description: "Ginger chicken soup with green papaya",
    ingredients: ["Chicken pieces", "Ginger", "Garlic", "Green papaya", "Chili leaves", "Fish sauce"],
    instructions: ["Sauté ginger and garlic", "Add chicken and brown", "Pour water and bring to boil", "Add papaya and simmer", "Add chili leaves before serving"],
    nutrition: { calories: 220, protein: 26, carbs: 12, fat: 8, fiber: 2 }
  },
  {
    id: 36,
    name: "Halo-Halo",
    image: "https://images.unsplash.com/photo-1715640476091-022c895f4cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    description: "Filipino shaved ice dessert with mixed ingredients",
    ingredients: ["Shaved ice", "Sweetened beans", "Nata de coco", "Ube halaya", "Leche flan", "Evaporated milk"],
    instructions: ["Layer ingredients in tall glass", "Add shaved ice on top", "Drizzle with evaporated milk", "Top with ube and leche flan", "Mix before eating"],
    nutrition: { calories: 320, protein: 6, carbs: 68, fat: 5, fiber: 4 }
  },
  {
    id: 37,
    name: "Bibingka",
    image: "https://images.unsplash.com/photo-1759922252179-428bb68f13e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "30 min",
    servings: 8,
    difficulty: "Medium",
    rating: 4.7,
    description: "Traditional Filipino rice cake",
    ingredients: ["Rice flour", "Coconut milk", "Sugar", "Eggs", "Salted egg", "Cheese"],
    instructions: ["Mix rice flour, coconut milk, and sugar", "Add beaten eggs", "Pour into banana leaf-lined pan", "Bake until golden", "Top with salted egg and cheese"],
    nutrition: { calories: 280, protein: 8, carbs: 42, fat: 10, fiber: 1 }
  },
  {
    id: 38,
    name: "Pork Menudo",
    image: "https://images.unsplash.com/photo-1675150277436-9c7348972c11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Filipino",
    cookTime: "50 min",
    servings: 6,
    difficulty: "Medium",
    rating: 4.6,
    description: "Tomato-based pork and liver stew",
    ingredients: ["Pork", "Pork liver", "Tomato sauce", "Potatoes", "Carrots", "Bell peppers"],
    instructions: ["Sauté garlic and onions", "Add pork and cook until brown", "Pour tomato sauce and simmer", "Add vegetables and liver", "Cook until tender"],
    nutrition: { calories: 340, protein: 26, carbs: 22, fat: 16, fiber: 3 }
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'recipes' | 'favorites' | 'meal-plan' | 'shopping'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [showNutrition, setShowNutrition] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [selectingMealFor, setSelectingMealFor] = useState<{ day: string; mealType: 'breakfast' | 'lunch' | 'dinner' } | null>(null);

  const categories = ['All', 'Pasta', 'Healthy', 'Dessert', 'Pork', 'Beef', 'Fish', 'Chicken', 'Soup', 'Breakfast', 'Pizza', 'Filipino'];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesIngredient = !ingredientFilter || recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(ingredientFilter.toLowerCase())
    );
    return matchesSearch && matchesCategory && matchesIngredient;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addIngredientToShoppingList = () => {
    if (newIngredient.trim()) {
      setShoppingList(prev => [...prev, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeFromShoppingList = (ingredient: string) => {
    setShoppingList(prev => prev.filter(item => item !== ingredient));
  };

  const addToMealPlan = (recipe: Recipe, day: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe
      }
    }));
    setSelectingMealFor(null);
    setActiveTab('meal-plan');
  };

  const displayedRecipes = activeTab === 'favorites'
    ? filteredRecipes.filter(recipe => favorites.includes(recipe.id))
    : filteredRecipes;

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (selectingMealFor) {
    return (
      <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSelectingMealFor(null)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700 text-white' : ''} rounded-full transition-colors`}
            >
              ← Back
            </button>
            <h1 className={`text-lg ${isDarkMode ? 'text-white' : ''}`}>
              Select {selectingMealFor.mealType} for {selectingMealFor.day}
            </h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden`}
                onClick={() => addToMealPlan(recipe, selectingMealFor.day, selectingMealFor.mealType)}
              >
                <div className="flex gap-4">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-2 left-2 px-2 py-1 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm rounded-full text-xs`}>
                      {recipe.category}
                    </div>
                  </div>

                  <div className="flex-1 py-3 pr-3">
                    <h3 className={`text-lg line-clamp-1 ${isDarkMode ? 'text-white' : ''}`}>{recipe.name}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-2`}>{recipe.description}</p>

                    <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={14} />
                        <span>{recipe.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame size={14} className="text-orange-500" />
                        <span>{recipe.nutrition.calories} cal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSelectedRecipe(null)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700 text-white' : ''} rounded-full transition-colors`}
            >
              ← Back
            </button>
            <button
              onClick={() => toggleFavorite(selectedRecipe.id)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              <Heart
                className={favorites.includes(selectedRecipe.id) ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}
                size={24}
              />
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.name}</h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{selectedRecipe.description}</p>

            <div className={`grid grid-cols-2 gap-4 mb-6 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm`}>
              <div className="flex items-center gap-2">
                <Clock className="text-orange-500" size={20} />
                <div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.cookTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-orange-500" size={20} />
                <div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Servings</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.servings}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="text-orange-500" size={20} />
                <div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Difficulty</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.difficulty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.rating}/5</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowNutrition(!showNutrition)}
              className={`w-full mb-6 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm flex items-center justify-between`}
            >
              <span className={`${isDarkMode ? 'text-white' : ''}`}>Nutrition Information</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{showNutrition ? '−' : '+'}</span>
            </button>

            {showNutrition && (
              <div className={`mb-6 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm`}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Flame className="text-orange-500 mx-auto mb-1" size={24} />
                    <div className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.nutrition.calories}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Calories</div>
                  </div>
                  <div>
                    <Zap className="text-blue-500 mx-auto mb-1" size={24} />
                    <div className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.nutrition.protein}g</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Protein</div>
                  </div>
                  <div>
                    <Cookie className="text-yellow-500 mx-auto mb-1" size={24} />
                    <div className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.nutrition.carbs}g</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Carbs</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center mt-4">
                  <div>
                    <div className={`text-xl ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.nutrition.fat}g</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fat</div>
                  </div>
                  <div>
                    <div className={`text-xl ${isDarkMode ? 'text-white' : ''}`}>{selectedRecipe.nutrition.fiber}g</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fiber</div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-white' : ''}`}>Ingredients</h2>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm p-4`}>
                <ul className="space-y-3">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1 text-lg">•</span>
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-white' : ''}`}>Instructions</h2>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm p-4`}>
                <ol className="space-y-4">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className={`pt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'meal-plan') {
    return (
      <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              <Menu size={24} className={isDarkMode ? 'text-white' : ''} />
            </button>
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={24} className={isDarkMode ? 'text-orange-500' : 'text-orange-600'} />
              <h1 className={`text-xl ${isDarkMode ? 'text-white' : ''}`}>RecipeHub</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Plan Your Week</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Organize your meals for the week</p>
          </div>

          <div className="space-y-4">
            {weekDays.map(day => (
              <div key={day} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm p-4`}>
                <h3 className={`text-lg mb-3 ${isDarkMode ? 'text-white' : ''}`}>{day}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Breakfast</div>
                    {mealPlan[day]?.breakfast ? (
                      <div
                        onClick={() => setSelectedRecipe(mealPlan[day].breakfast!)}
                        className={`text-sm ${isDarkMode ? 'text-white' : ''} p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded cursor-pointer hover:opacity-80`}
                      >
                        {mealPlan[day].breakfast.name}
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectingMealFor({ day, mealType: 'breakfast' })}
                        className={`text-xs p-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} rounded w-full hover:bg-orange-500 hover:text-white transition-colors`}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Lunch</div>
                    {mealPlan[day]?.lunch ? (
                      <div
                        onClick={() => setSelectedRecipe(mealPlan[day].lunch!)}
                        className={`text-sm ${isDarkMode ? 'text-white' : ''} p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded cursor-pointer hover:opacity-80`}
                      >
                        {mealPlan[day].lunch.name}
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectingMealFor({ day, mealType: 'lunch' })}
                        className={`text-xs p-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} rounded w-full hover:bg-orange-500 hover:text-white transition-colors`}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Dinner</div>
                    {mealPlan[day]?.dinner ? (
                      <div
                        onClick={() => setSelectedRecipe(mealPlan[day].dinner!)}
                        className={`text-sm ${isDarkMode ? 'text-white' : ''} p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded cursor-pointer hover:opacity-80`}
                      >
                        {mealPlan[day].dinner.name}
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectingMealFor({ day, mealType: 'dinner' })}
                        className={`text-xs p-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} rounded w-full hover:bg-orange-500 hover:text-white transition-colors`}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`fixed left-0 top-0 h-full w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
              >
                <X size={24} className={isDarkMode ? 'text-white' : ''} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 px-3`}>CATEGORIES</h3>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveTab('recipes');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-30`}>
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'home' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Home size={24} className={activeTab === 'home' ? 'fill-orange-500' : ''} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'recipes' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <BookOpen size={24} />
              <span className="text-xs">Recipes</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'favorites' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Heart size={24} className={activeTab === 'favorites' ? 'fill-orange-500' : ''} />
              <span className="text-xs">Favorites</span>
            </button>
            <button
              onClick={() => setActiveTab('meal-plan')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'meal-plan' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs">Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'shopping' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <ShoppingCart size={24} />
              <span className="text-xs">Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'shopping') {
    return (
      <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              <Menu size={24} className={isDarkMode ? 'text-white' : ''} />
            </button>
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={24} className={isDarkMode ? 'text-orange-500' : 'text-orange-600'} />
              <h1 className={`text-xl ${isDarkMode ? 'text-white' : ''}`}>RecipeHub</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Shopping List</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{shoppingList.length} items</p>
          </div>

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add ingredient (e.g., 2 lbs chicken breast)..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredientToShoppingList()}
                className={`flex-1 px-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
              <button
                onClick={addIngredientToShoppingList}
                className="px-6 py-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {shoppingList.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Your shopping list is empty. Add ingredients above!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {shoppingList.map((item, index) => (
                <div
                  key={index}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-4 flex items-center justify-between`}
                >
                  <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>{item}</span>
                  <button
                    onClick={() => removeFromShoppingList(item)}
                    className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setShoppingList([])}
                className="w-full mt-4 p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors"
              >
                Clear All Items
              </button>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`fixed left-0 top-0 h-full w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
              >
                <X size={24} className={isDarkMode ? 'text-white' : ''} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 px-3`}>CATEGORIES</h3>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveTab('recipes');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-30`}>
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'home' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Home size={24} className={activeTab === 'home' ? 'fill-orange-500' : ''} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'recipes' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <BookOpen size={24} />
              <span className="text-xs">Recipes</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'favorites' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Heart size={24} className={activeTab === 'favorites' ? 'fill-orange-500' : ''} />
              <span className="text-xs">Favorites</span>
            </button>
            <button
              onClick={() => setActiveTab('meal-plan')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'meal-plan' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs">Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'shopping' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <ShoppingCart size={24} />
              <span className="text-xs">Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'}`}>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`fixed left-0 top-0 h-full w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
            >
              <X size={24} className={isDarkMode ? 'text-white' : ''} />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 px-3`}>CATEGORIES</h3>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-md'
                    : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`sticky top-0 z-30 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
          >
            <Menu size={24} className={isDarkMode ? 'text-white' : ''} />
          </button>
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={24} className={isDarkMode ? 'text-orange-500' : 'text-orange-600'} />
            <h1 className={`text-xl ${isDarkMode ? 'text-white' : ''}`}>RecipeHub</h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors`}
          >
            {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} />}
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'home' && (
          <>
            <div className="mb-6">
              <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Discover</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Find your next favorite recipe</p>
            </div>

            <div className="mb-6">
              <div className="relative mb-3">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
              </div>
              <div className="relative">
                <ChefHat className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Filter by ingredient (e.g., chicken, pasta)..."
                  value={ingredientFilter}
                  onChange={(e) => setIngredientFilter(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>FEATURED CATEGORY</h3>
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSelectedCategory('Filipino');
                    setActiveTab('recipes');
                  }}
                  className={`w-full p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-orange-400 to-red-500'} text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="text-5xl mb-3">🇵🇭</div>
                  <div className="text-2xl mb-1">Filipino Food</div>
                  <div className="text-sm opacity-90">12 authentic recipes</div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ALL CATEGORIES</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white shadow-md'
                        : isDarkMode
                        ? 'bg-gray-800 text-gray-300 border border-gray-700'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'favorites' && (
          <div className="mb-6">
            <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Favorites</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Your saved recipes</p>
          </div>
        )}

        {activeTab === 'recipes' && (
          <>
            <div className="mb-6">
              <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>All Recipes</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{filteredRecipes.length} recipes available</p>
            </div>

            <div className="mb-6">
              <div className="relative mb-3">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
              </div>
              <div className="relative">
                <ChefHat className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Filter by ingredient..."
                  value={ingredientFilter}
                  onChange={(e) => setIngredientFilter(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-4">
          {displayedRecipes.map(recipe => (
            <div
              key={recipe.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 left-2 px-2 py-1 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm rounded-full text-xs`}>
                    {recipe.category}
                  </div>
                </div>

                <div className="flex-1 py-3 pr-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-lg line-clamp-1 ${isDarkMode ? 'text-white' : ''}`}>{recipe.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className={`p-1 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} rounded-full transition-colors ml-2`}
                    >
                      <Heart
                        className={favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}
                        size={20}
                      />
                    </button>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-2`}>{recipe.description}</p>

                  <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={14} />
                      <span>{recipe.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={14} className="text-orange-500" />
                      <span>{recipe.nutrition.calories} cal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayedRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              {activeTab === 'favorites'
                ? 'No favorites yet. Start adding recipes!'
                : 'No recipes found. Try a different search!'}
            </p>
          </div>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-30`}>
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'home' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Home size={24} className={activeTab === 'home' ? 'fill-orange-500' : ''} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'recipes' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs">Recipes</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'favorites' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Heart size={24} className={activeTab === 'favorites' ? 'fill-orange-500' : ''} />
            <span className="text-xs">Favorites</span>
          </button>
          <button
            onClick={() => setActiveTab('meal-plan')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'meal-plan' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs">Plan</span>
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'shopping' ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <ShoppingCart size={24} />
            <span className="text-xs">Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
}
