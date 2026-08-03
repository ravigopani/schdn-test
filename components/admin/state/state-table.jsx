"use client";

import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * @param {{
 *   data: import("@/types/state").State[],
 *   sortBy: string,
 *   sortOrder: "asc" | "desc",
 *   onSort: (column: string) => void,
 *   onDelete: (state: import("@/types/state").State) => void,
 * }} props
 */
export function StateTable({ data, sortBy, sortOrder, onSort, onDelete }) {
  /**
   * @param {string} column
   * @param {string} label
   */
  function SortableHead({ column, label }) {
    const isActive = sortBy === column;
    const Icon = !isActive
      ? ArrowUpDownIcon
      : sortOrder === "asc"
        ? ArrowUpIcon
        : ArrowDownIcon;

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-ml-2 h-8 px-2"
        onClick={() => onSort(column)}
      >
        {label}
        <Icon className="size-3.5 opacity-60" />
      </Button>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <SortableHead column="name" label="Name" />
          </TableHead>
          <TableHead>ID</TableHead>
          <TableHead className="w-14 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((state) => (
          <TableRow key={state.id}>
            <TableCell className="font-medium">{state.name}</TableCell>
            <TableCell>
              <Badge variant="secondary" className="font-mono font-normal">
                {state.id}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${state.name}`}
                    />
                  }
                >
                  <MoreHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem
                    render={<Link href={`/admin/state/${state.id}`} />}
                  >
                    <EyeIcon />
                    View
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    render={<Link href={`/admin/state/${state.id}`} />}
                  >
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => onDelete(state)}
                  >
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
