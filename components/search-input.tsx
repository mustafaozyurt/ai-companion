"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const categoryId = searchParams.get("categoryId");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      categoryId: categoryId,
      name: debouncedValue,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [categoryId, debouncedValue, router]);

  return (
    <div>
      <Search className="absolute top-7 left-11 md:left-24 h-4 w-4" />
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search.."
        className="pl-11 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
