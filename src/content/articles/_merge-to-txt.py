import os

def merge_mdx_to_txt(directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for filename in os.listdir(directory):
            if filename.endswith('.mdx'):
                filepath = os.path.join(directory, filename)
                with open(filepath, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read() + "\n\n")

directory = r'c:\Users\zivavu\Desktop\atomic-hub\src\content\articles'
output_file = 'merged_articles.txt'
merge_mdx_to_txt(directory, output_file)