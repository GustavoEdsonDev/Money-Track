# Como Executar as Migrations do Supabase

## 📋 Opção 1: Via SQL Editor do Supabase Dashboard (Mais Fácil)

1. **Abra o Supabase Dashboard**
   - Acesse [app.supabase.com](https://app.supabase.com)
   - Selecione seu projeto

2. **Vá para SQL Editor**
   - Clique em **SQL Editor** na sidebar esquerda
   - Clique em **New Query** ou **New**

3. **Cole o SQL**
   - Abra o arquivo `supabase/migrations/001_initial_schema.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor do Supabase

4. **Execute**
   - Clique no botão **Run** (ou Ctrl + Enter)
   - Aguarde a conclusão

5. **Verifique**
   - Vá para **Table Editor** na sidebar
   - Você verá as tabelas criadas:
     - `profiles`
     - `categories`
     - `accounts`
     - `transactions`
     - `budgets`

---

## 🔧 Opção 2: Via CLI Supabase (Mais Profissional)

### Instalação da CLI
```bash
npm install -g supabase
```

### Login no Supabase
```bash
supabase login
```

### Criar Migração
```bash
supabase migration new initial_schema
```

Isso criará um arquivo em `supabase/migrations/` com timestamp.

### Executar Migrations
```bash
supabase db push
```

---

## ✅ Após Executar as Migrations

### 1. Criar Perfil do Usuário
Adicione um trigger para criar o profile automaticamente quando um usuário se registra:

```sql
create or replace function public.handle_new_user()
returns trigger
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql;

-- Trigger que cria o profile automaticamente
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Este trigger está **OPCIONAL** - pode ser executado após o schema principal.

### 2. Testar as Policies
- Crie um novo usuário via `/register`
- Tente criar uma categoria
- Verifique se só o usuário consegue ver seus dados

---

## 🐛 Troubleshooting

### Erro: "relation does not exist"
- Aguarde alguns segundos e tente novamente
- As tabelas podem estar ainda sendo criadas

### Erro: "permission denied"
- Verifique se está usando a Anon Key (não a Service Role Key)
- As RLS policies podem estar bloqueando

### Erro: "duplicate key value"
- A tabela já existe
- Você pode dropar e recriar com `drop table if exists table_name cascade`

---

## 📊 Estrutura das Tabelas

```
profiles (id, name, email, avatar_url, created_at)
  └─ Relacionada com auth.users.id

categories (id, user_id, name, type, color, icon, created_at)
  └─ type: 'income' | 'expense'

accounts (id, user_id, name, type, initial_balance, created_at)
  └─ type: 'cash' | 'bank' | 'credit_card' | 'investment'

transactions (id, user_id, account_id, category_id, title, description, amount, type, transaction_date, created_at)
  └─ type: 'income' | 'expense'
  └─ Relacionada com accounts e categories

budgets (id, user_id, category_id, amount_limit, month, year, created_at)
  └─ Relacionada com categories
```

---

## 🔒 Segurança (RLS)

Todas as tabelas têm **Row Level Security (RLS)** ativado:
- Usuários só veem seus próprios dados
- Usuários não conseguem acessar dados de outros
- As policies estão configuradas para SELECT, INSERT, UPDATE, DELETE

---

## ⚡ Próximos Passos

1. ✅ Execute as migrations
2. ✅ Teste criando um usuário
3. ⏭️ Crie API routes para CRUD das tabelas
4. ⏭️ Integre com o dashboard

