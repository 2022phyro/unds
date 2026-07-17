'use client';

import { useRef } from 'react';

export function DeleteButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button 
        type="button" // Important: prevents form submission when clicking the trigger
        onClick={() => dialogRef.current?.showModal()} 
        className="text-red-500 font-semibold hover:text-red-800 transition-colors"
      >
        Delete
      </button>

      <dialog 
        ref={dialogRef} 
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm w-full max-w-sm"
      >
        <div className="space-y-4">
          <h2 className="text-lg! font-bold text-center">Confirm Deletion</h2>
          <p className="text-gray-600 text-center">
            Are you sure? This action cannot be undone.
          </p>
          
          <div className="flex gap-10 justify-center pt-4">
            <button 
              type="button" // Important: keeps modal open
              onClick={() => dialogRef.current?.close()}
              className="px-4 py-2 text-sm! text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              Cancel    
            </button>
            <button 
              type="submit" // This submits the form that wraps this component
              className="px-4 py-2 bg-red-600 text-sm! text-white rounded hover:bg-red-700 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}