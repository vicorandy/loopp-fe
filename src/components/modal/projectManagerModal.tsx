import { FC, ReactNode, useEffect } from 'react';
import { X, CheckSquare, BarChart2, Headset } from 'lucide-react';

interface DedicatedPMModalProps {
  open: boolean;
  onClose: () => void;
}

export const DedicatedPMModal: FC<DedicatedPMModalProps> = ({ open, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  const Backdrop: FC<{ children: ReactNode }> = ({ children }) => (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {children}
    </div>
  );

  return (
    <Backdrop>
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-1">
          Why You Need a Dedicated Project Manager
        </h2>
        <div className="h-0.5 bg-gray-300 my-3" />
        <p className="text-sm text-gray-600 mb-6">
          Turn ideas into reality with expert execution and strategic oversight.
        </p>

        {/* Feature list */}
        <ul className="space-y-5">
          <ModalItem
            icon={<CheckSquare className="w-5 h-5 text-gray-700" />}
            title="Seamless Execution, Guaranteed"
          >
            Our Dedicated Project Manager ensures every step of your project is optimized for efficiency, innovation, and success.
          </ModalItem>
          <ModalItem
            icon={<BarChart2 className="w-5 h-5 text-gray-700" />}
            title="Data‑Driven Decision Making"
          >
            Leverage real‑time analytics and user feedback to make informed, market‑driven decisions at every stage.
          </ModalItem>
          <ModalItem
            icon={<Headset className="w-5 h-5 text-gray-700" />}
            title="Proactive Problem‑Solving"
          >
            We anticipate challenges before they arise, keeping your project on track and within scope.
          </ModalItem>
        </ul>
      </div>
    </Backdrop>
  );
};

interface ModalItemProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}
const ModalItem: FC<ModalItemProps> = ({ icon, title, children }) => (
  <li className="flex items-start gap-3">
    <div className="mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  </li>
);
