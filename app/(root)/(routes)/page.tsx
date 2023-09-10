import { PrismaClient } from "@prisma/client";

import Categories from "@/components/categories";
import SearchInput from "@/components/search-input";

export default async function RootPage() {

  const db = new PrismaClient();

  const categories = await db.category.findMany(); 

  return (
    <div className="relative">
      <div className="p-4 px-20">
        <SearchInput />
        <Categories data={categories}/>
      </div>
    </div>
  );
}
