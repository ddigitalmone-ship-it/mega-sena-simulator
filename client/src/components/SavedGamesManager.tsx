/**
 * SavedGamesManager Component
 * 
 * Gerencia jogos salvos do usuário com integração ao backend
 * Features: salvar, listar, deletar, exportar para S3
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Save, 
  Trash2, 
  Download, 
  FolderOpen, 
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Hash
} from "lucide-react";
import { toast } from "sonner";

interface SavedGamesManagerProps {
  selectedNumbers: number[];
  currentIFR: number;
  strategy?: string;
  onLoadGame?: (numbers: number[]) => void;
}

export function SavedGamesManager({ 
  selectedNumbers, 
  currentIFR, 
  strategy,
  onLoadGame 
}: SavedGamesManagerProps) {
  const [gameName, setGameName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"txt" | "csv" | "json">("txt");

  // tRPC queries and mutations
  const utils = trpc.useUtils();
  const { data: savedGames, isLoading: loadingGames } = trpc.games.list.useQuery(
    undefined,
    { enabled: listDialogOpen }
  );

  const createGame = trpc.games.create.useMutation({
    onSuccess: () => {
      toast.success("Jogo salvo com sucesso!");
      setSaveDialogOpen(false);
      setGameName("");
      utils.games.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao salvar: ${error.message}`);
    },
  });

  const deleteGame = trpc.games.delete.useMutation({
    onSuccess: () => {
      toast.success("Jogo removido!");
      utils.games.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao remover: ${error.message}`);
    },
  });

  const exportGames = trpc.files.exportGames.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.gamesExported} jogos exportados!`);
      setExportDialogOpen(false);
      // Open download URL
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error(`Erro ao exportar: ${error.message}`);
    },
  });

  const handleSaveGame = () => {
    if (selectedNumbers.length < 6) {
      toast.error("Selecione pelo menos 6 números");
      return;
    }
    if (!gameName.trim()) {
      toast.error("Digite um nome para o jogo");
      return;
    }

    createGame.mutate({
      name: gameName.trim(),
      numbers: selectedNumbers,
      strategy: strategy || undefined,
      ifr: currentIFR,
    });
  };

  const handleDeleteGame = (id: number) => {
    if (confirm("Tem certeza que deseja remover este jogo?")) {
      deleteGame.mutate({ id });
    }
  };

  const handleLoadGame = (numbers: number[]) => {
    if (onLoadGame) {
      onLoadGame(numbers);
      setListDialogOpen(false);
      toast.success("Jogo carregado!");
    }
  };

  const handleExport = () => {
    exportGames.mutate({ format: exportFormat });
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

  return (
    <div className="flex flex-wrap gap-2">
      {/* Save Game Button */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            disabled={selectedNumbers.length < 6}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Jogo
          </Button>
        </DialogTrigger>
        <DialogContent className="neo-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Salvar Jogo
            </DialogTitle>
            <DialogDescription>
              Salve sua combinação para acessar depois
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Jogo</label>
              <Input
                placeholder="Ex: Meu palpite da sorte"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                maxLength={255}
              />
            </div>

            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">Números selecionados:</p>
              <div className="flex flex-wrap gap-1">
                {selectedNumbers.map((num) => (
                  <span 
                    key={num}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold"
                  >
                    {num.toString().padStart(2, "0")}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>IFR: {currentIFR}</span>
                {strategy && <span>Estratégia: {strategy}</span>}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setSaveDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveGame}
              disabled={createGame.isPending || !gameName.trim()}
            >
              {createGame.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List Saved Games Button */}
      <Dialog open={listDialogOpen} onOpenChange={setListDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Meus Jogos
          </Button>
        </DialogTrigger>
        <DialogContent className="neo-card max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Meus Jogos Salvos
            </DialogTitle>
            <DialogDescription>
              Gerencie suas combinações salvas
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {loadingGames ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : savedGames && savedGames.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <div className="space-y-3">
                  {savedGames.map((game) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{game.name}</h4>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(game.numbers as number[]).map((num) => (
                              <span 
                                key={num}
                                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold"
                              >
                                {num.toString().padStart(2, "0")}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              IFR: {game.ifr || "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(game.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLoadGame(game.numbers as number[])}
                            title="Carregar jogo"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGame(game.id)}
                            className="text-destructive hover:text-destructive"
                            title="Remover jogo"
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
                <p className="text-muted-foreground">Nenhum jogo salvo ainda</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Selecione números e clique em "Salvar Jogo"
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Games Button */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exportar
          </Button>
        </DialogTrigger>
        <DialogContent className="neo-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Exportar Jogos
            </DialogTitle>
            <DialogDescription>
              Exporte todos os seus jogos salvos para um arquivo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Formato do Arquivo</label>
              <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as typeof exportFormat)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="txt">Texto (.txt)</SelectItem>
                  <SelectItem value="csv">Planilha (.csv)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p>O arquivo será salvo na nuvem e você receberá um link para download.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setExportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleExport}
              disabled={exportGames.isPending}
            >
              {exportGames.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Exportar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SavedGamesManager;
