import { useState } from "react";
import { DropdownMenu, Button } from "@radix-ui/themes";

interface FilterButtonProps {
  onFilterChange: (filter: string) => void;
}

export function FilterButton({ onFilterChange }: FilterButtonProps) {
  const [selectedFilter, setSelectedFilter] = useState("doing");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const handleDropdownChange = (filter: string) => {
    handleFilterChange(filter);
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onSelect={() => handleDropdownChange("all")}
            shortcut="⌘ A"
          >
            All
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleDropdownChange("doing")}
            shortcut="⌘ D"
          >
            Doing
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleDropdownChange("done")}
            shortcut="⌘ N"
          >
            Done
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}