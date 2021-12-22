from os import listdir, walk, sep
from os.path import isfile, basename


def main():
    packages = listdir("packages")
    num_packages = len(packages)
    total_source_code_files = 0
    count = dict({
        "web": 0,
        "client-controllers": 0,
        "server": 0,
        "mobile": 0,
    })

    for root, dirs, files in walk("."):
        path = root.split(sep)
        if isUnwanted(path):
            continue

        increment_count_key = None
        if len(path) > 2 and path[1] == "packages":
            package_name = path[2]
            if package_name == "web":
                increment_count_key = "web"
            if package_name == "server":
                increment_count_key = "server"
            if package_name == "client-controllers":
                increment_count_key = "client-controllers"
            if package_name ==  "mobile":
                increment_count_key = "mobile"

        for file in files:
            if not isUnwantedFile(file):
                total_source_code_files += 1
                if increment_count_key:
                    count[increment_count_key] += 1

    packages_stats_str = ""

    for key in count:
        packages_stats_str += f"   * {key}: {count[key]}\n"


    print(f"""
Project file stats:
 - Number of packages: {num_packages} ({", ".join(packages)})
 - Number of source code files: {total_source_code_files}
 - Source code files count per package
{packages_stats_str}""")

def isUnwanted(dirname: str) -> bool:
    for unwanted in ["node_modules", ".next", "cache", ".git", "fonts", "assets", ".vercel"]:
        if unwanted in dirname:
            return True
    return False

def isUnwantedFile(filename: str) -> bool:
    for unwanted in [".eslint", "env.d.ts", "postcss", ".prettierrc", "CODE_OF_CONDUCT", "CONTRIBUTING", "LICENSE", ".lock", ]:
        if unwanted in filename:
            return True
    return False

if __name__ == "__main__":
    main()