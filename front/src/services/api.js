/**
 * Ponto único de configuração da URL base da API.
 *
 * - Em desenvolvimento local (sem Docker): fallback para http://localhost:4000
 * - Em Docker local: definir REACT_APP_API_URL=http://localhost:4000 no front/.env
 * - Em produção (Vercel): definir REACT_APP_API_URL no painel da Vercel
 *   apontando para o backend deployado (ex: https://seu-backend.vercel.app)
 */
export const API_BASE =
  process.env.REACT_APP_API_URL || 'http://localhost:4000';
