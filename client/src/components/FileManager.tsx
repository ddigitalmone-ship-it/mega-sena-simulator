/**
 * FileManager Component
 * 
 * Gerencia arquivos do usuário armazenados no S3
 * Features: listar, baixar, deletar arquivos exportados
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Files, 
  Download, 
  Trash2, 
  FileText,
  FileSpreadsheet,
  FileJson,
  Loader2,
  AlertCircle,
  Calendar,
  HardDrive,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface FileManagerProps {
  trigger?: React.ReactNode;
}

export function FileManager({ trigger }: FileManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const utils = trpc.useUtils();
  const { data: files, isLoading } = trpc.files.list.useQuery(
    undefined,
    { enabled: dialogOpen }
  );

  const deleteFile = trpc.files.delete.useMutation({
    onSuccess: () => {
      toast.success("Arquivo removido!");
      utils.files.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao remover: ${error.message}`);
    },
  });

  const getDownloadUrl = trpc.files.getDownloadUrl.useQuery;

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover este arquivo?")) {
      deleteFile.mutate({ id });
    }
  };

  const handleDownload = async (id: number, filename: string) => {
    try {
      // Fetch fresh download URL
      const response = await fetch(`/api/trpc/files.getDownloadUrl?input=${encodeURIComponent(JSON.stringify({ id }))}`);
      const data = await response.json();
      
      if (data.result?.data?.url) {
        window.open(data.result.data.url, "_blank");
      } else {
        toast.error("Erro ao obter URL de download");
      }
    } catch (error) {
      toast.error("Erro ao baixar arquivo");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("csv") || mimeType.includes("spreadsheet")) {
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    }
    if (mimeType.includes("json")) {
      return <FileJson className="w-5 h-5 text-yellow-500" />;
    }
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case "export": return "Exportação";
      case "report": return "Relatório";
      case "backup": return "Backup";
      default: return fileType;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Files className="w-4 h-4" />
            Meus Arquivos
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="neo-card max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Files className="w-5 h-5 text-primary" />
            Meus Arquivos
          </DialogTitle>
          <DialogDescription>
            Arquivos exportados e salvos na nuvem
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : files && files.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <div className="space-y-3">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-background">
                          {getFileIcon(file.mimeType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate" title={file.originalName}>
                            {file.originalName}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {getFileTypeLabel(file.fileType)}
                            </span>
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3" />
                              {formatSize(file.size)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(file.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file.id, file.originalName)}
                          title="Baixar arquivo"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(file.url, "_blank")}
                          title="Abrir em nova aba"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="text-destructive hover:text-destructive"
                          title="Remover arquivo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Nenhum arquivo encontrado</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Exporte seus jogos para criar arquivos
              </p>
            </div>
          )}
        </div>

        {files && files.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              {files.length} arquivo{files.length !== 1 ? "s" : ""} • 
              Total: {formatSize(files.reduce((acc, f) => acc + f.size, 0))}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FileManager;
