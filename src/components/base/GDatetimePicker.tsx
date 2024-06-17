/* eslint-disable */

import * as React from 'react';
import { Modal } from 'native-base';
import DatePicker from 'react-native-modern-datepicker';

export interface IGDatetimePicker {
  mode: 'time' | 'monthYear' | 'datepicker' | 'calendar' | undefined;
  selectorStartingYear?: number;
  current?: string;
  selected?: string;
  onMonthYearChange: (selectedDate: string) => void;
  onSelectedChange: (selectedDate: string) => void;
  isShowDatePickerModal: boolean;
  closeDatePickerModal: () => void;
}

export default function GDatetimePicker({
  mode,
  selectorStartingYear,
  current,
  selected,
  onMonthYearChange,
  onSelectedChange,
  isShowDatePickerModal,
  closeDatePickerModal,
}: IGDatetimePicker) {
  return (
    <>
      <Modal isOpen={isShowDatePickerModal} onClose={closeDatePickerModal}>
        <Modal.Content minWidth="340" maxWidth="350" bg="white">
          <Modal.Body bg="white" _scrollview={{ scrollEnabled: false }}>
            <DatePicker
              mode={mode}
              current={current}
              selected={selected}
              selectorStartingYear={selectorStartingYear}
              onMonthYearChange={onMonthYearChange}
              onSelectedChange={onSelectedChange}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
