import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface props {
  title: string;
  message?: string;
  onAccept?: () => void;
  open: boolean;
  onClose: () => void;
  acceptText?: string;
}

export const Alert = ({
  title,
  message,
  onAccept,
  open,
  onClose,
  acceptText = "Accept",
}: props) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    onAccept && onAccept();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 h-screen w-full flex
      z-10 justify-center items-center bg-black bg-opacity-30 px-5"
        >
          <Card>
            <div className="p-5 flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
              {message && <p className="text-slate-600">{message}</p>}
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  className="p-3 px-4"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="p-3 px-4">
                  {acceptText}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
