import React, { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import IconX from '@/components/icon/icon-x';

type TProps = {
  title: string;
  show: boolean;
  toggle: () => void;
  onCancel: () => void;
  onConfirm?: (p?: any) => void;
  children: React.ReactNode;
  isConfirmDisabled?: boolean;
  rightModal?: boolean;
  notesModal?: boolean;
  noteButton?: (p?: any) => void;
  noteText?: string;
  setNoteText?: React.Dispatch<React.SetStateAction<string>>;
  isScrollable?: boolean;
  duplicateTask?: (p?: any) => void;
};

export const ModalForm = ({
  title,
  show,
  toggle,
  onCancel,
  onConfirm,
  children,
  isConfirmDisabled = false,
  rightModal = false,
  notesModal = false,
  noteButton,
  noteText,
  setNoteText,
  isScrollable = false,
  duplicateTask,
}: TProps) => {
  return (
    <Dialog as="div" open={show} onClose={toggle} className="relative z-50">
      <div className={`fixed inset-0 bg-black/60`} />

      <div
        className={`fixed  inset-0 overflow-y-auto overflow-x-hidden ${
          rightModal
            ? 'flex justify-end '
            : 'flex items-center justify-center px-4 py-8'
        }`}>
        <Dialog.Panel
          className={`panel flex w-full flex-col bg-white dark:bg-[#121c2c] ${
            rightModal ? 'h-full max-w-md rounded-l-lg' : 'max-w-lg rounded-lg'
          } border-0 p-0 text-black dark:text-white-dark`}
          onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-4 top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600">
            <IconX />
          </button>

          {/* Header */}
          <div className="min-h-[50px] bg-[#fbfbfb] pl-5 pt-5 text-lg font-medium dark:bg-[#121c2c]">
            {title}
          </div>

          {/* Content (scrollable area) */}
          <div className={`flex-1 p-5 bg-white ${isScrollable ? 'overflow-auto' : ''}`}>
            {children}
          </div>

          {/* Duplicate button section */}
          {duplicateTask && (
            <div className="flex w-full bg-white p-5 dark:bg-[#121c2c]">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={duplicateTask}>
                Duplicate this task to another day
              </button>
            </div>
          )}

          {/* Footer section */}
          <div className="flex justify-end gap-5 border-t-2 bg-white p-5 dark:bg-[#121c2c]">
            {notesModal === false && onConfirm && onCancel && (
              <Fragment>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={onCancel}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-4"
                  disabled={isConfirmDisabled}
                  onClick={onConfirm}>
                  Confirm
                </button>
              </Fragment>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
