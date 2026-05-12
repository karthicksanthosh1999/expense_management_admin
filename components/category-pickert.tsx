"use client";

import { categoryConfig } from "@/lib/icon-center";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
};

export default function CategoryHorizontalPicker({ control }: Props) {
  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div className="w-full">
          {/* Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              const active = field.value === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => field.onChange(key)}
                  className={`
                      w-22
                      h-16
                      my-2
                      snap-start
                      shrink-0
                      rounded-xl
                      border
                      transition-all
                      flex flex-col items-center justify-center
                      cursor-pointer
                      ${
                        active
                          ? "border-primary scale-105 shadow-md"
                          : "border-gray-200"
                      }
                    `}>
                  <div
                    className={`bg-linear-to-r ${config.bg} p-2 rounded-xl text-white`}>
                    <Icon size={15} />
                  </div>

                  <span className="text-sm capitalize">{key}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
}
