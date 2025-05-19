
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';

import type { DateRange } from 'react-day-picker';

const dayPickerStyles = `
.rdp-day_selected, 
.rdp-day_selected:focus-visible, 
.rdp-day_selected:hover {
  background-color: #6d28d9 !important;
  color: white !important;
}

.rdp-day_range_middle {
  background-color: rgba(109, 40, 217, 0.1) !important;
}

.rdp-dropdown {
  color: #6d28d9;
}

.rdp-button:hover:not([disabled]) {
  background-color: rgba(109, 40, 217, 0.1);
}

.rdp-day_today {
  font-weight: bold;
  color: #6d28d9;
  border: 1px solid currentColor;
}
`;

interface DateFilterProps {
  dateRange: DateRange | undefined;
  onHandleDaySelected: (range: DateRange | undefined) => void;
}

export const DateFilter = ({ dateRange, onHandleDaySelected }: DateFilterProps) => {
  return (
    <aside className="w-[320px]">
      <style>{dayPickerStyles}</style>
      <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg p-3">
        <h2 className="text-lg font-bold mb-2 text-gray-800">Filtrar por Data</h2>
        <DayPicker
          mode="range"
          defaultMonth={new Date()}
          selected={dateRange}
          onSelect={onHandleDaySelected}
          locale={ptBR}
          className="rdp-month"
          numberOfMonths={1}
          fromYear={2020}
          toYear={new Date().getFullYear() + 1}
          captionLayout="dropdown"
          weekStartsOn={1}
        />
      </div>
    </aside>
  );
};