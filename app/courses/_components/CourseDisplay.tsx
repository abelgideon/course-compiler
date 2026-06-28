"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { CourseCard, CourseCardData } from "./CourseCard";

const ALL_CATEGORIES = "All Categories";

export function CourseDisplay({ courses }: { courses: CourseCardData[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        courses
          .map((course) => course.category)
          .filter((category): category is string => category !== null),
      ),
    ].sort();

    return [ALL_CATEGORIES, ...uniqueCategories];
  }, [courses]);

  const searchTerm = search.trim().toLowerCase();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === ALL_CATEGORIES || course.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, category]);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-3 md:flex-row md:gap-10">
        <Input
          type="text"
          placeholder="Search for a course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Combobox
          items={categories}
          value={category}
          onValueChange={(value) => setCategory(value ?? ALL_CATEGORIES)}
        >
          <ComboboxInput placeholder="Select a category" />
          <ComboboxContent>
            <ComboboxEmpty>No categories found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No courses found.
        </p>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
