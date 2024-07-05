import win32com.client as win32
import pandas as pd

def open_and_save_excel(input_file):
    excel = win32.gencache.EnsureDispatch('Excel.Application')
    wb = excel.Workbooks.Open(input_file)
    wb.Save()
    wb.Close(False)
    excel.Application.Quit()

def find_column_with_brace(df):
    # Iterar sobre as colunas para encontrar a que contém '{' na primeira linha
    for col in df.columns:
        if df[col].iloc[0] == '{':
            return col
    return None

def excel_to_raw_json(input_file, sheet_name, output_file):
    print(f"Processando planilha: {sheet_name}")
    df = pd.read_excel(input_file, sheet_name=sheet_name, engine='openpyxl', header=None)

    # Encontrar a coluna que contém '{' na primeira linha
    column_name = find_column_with_brace(df)
    print(f"Coluna encontrada: {column_name}")
    
    if column_name is None:
        print(f"Coluna com '{{' não encontrada na planilha '{sheet_name}'")
        return

    # Selecionar a coluna desejada
    column_data = df[column_name].dropna().tolist()  # Remove valores NaN

    # Abrir o arquivo para escrita
    with open(output_file, 'w', encoding='utf-8') as file:
        for item in column_data:
            file.write(f'{item}\n')

# Atualizar o arquivo Excel
input_file = r"D:\Documents\Projetos\Pessoal\Minecraft\planilha_skills.xlsx"
open_and_save_excel(input_file)

# Iteração para múltiplas planilhas
sheet_names = ["definitions", "skills", "connections"]
output_files = ["definitions.json", "skills.json", "connections.json"]

for sheet, output in zip(sheet_names, output_files):
    excel_to_raw_json(input_file, sheet, output)
