"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
    items: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

const Combobox = ({
    items,
    onChange,
    value,
    placeholder,
    className,
}: ComboboxProps) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = React.useCallback(
        (currentValue: string) => {
            onChange?.(currentValue);
            setOpen(false);
        },
        [onChange]
    );

    const currentValue = React.useMemo(() => {
        if (value) {
            return items.find((item) => item.value === value)?.label;
        }
        return placeholder || "Select...";
    }, [value, items, placeholder]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-[200px] justify-between overflow-hidden truncate",
                        className
                    )}
                >
                    <span className="w-11/12 overflow-hidden truncate text-ellipsis text-left">
                        {currentValue}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => handleSelect(item.value)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;
