#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILE_NAME "students.txt"

struct Student {
    int roll;
    char name[50];
    float marks;
};

void clearScreen() {
    system("cls || clear");
}

void printLine() {
    printf("============================================\n");
}

void printTitle() {
    printLine();
    printf("     STUDENT MANAGEMENT SYSTEM\n");
    printLine();
}

void addStudent() {
    FILE *fp = fopen(FILE_NAME, "ab");
    struct Student s;

    clearScreen();
    printTitle();

    printf("Enter Roll Number: ");
    scanf("%d", &s.roll);

    printf("Enter Name: ");
    scanf(" %[^\n]", s.name);

    printf("Enter Marks: ");
    scanf("%f", &s.marks);

    fwrite(&s, sizeof(s), 1, fp);
    fclose(fp);

    printf("\n Student Added Successfully!\n");
    printf("Press Enter to continue...");
    getchar(); getchar();
}

void viewStudents() {
    FILE *fp = fopen(FILE_NAME, "rb");
    struct Student s;

    clearScreen();
    printTitle();

    printf("%-10s %-20s %-10s\n", "ROLL", "NAME", "MARKS");
    printLine();

    while (fread(&s, sizeof(s), 1, fp)) {
        printf("%-10d %-20s %-10.2f\n", s.roll, s.name, s.marks);
    }

    fclose(fp);

    printf("\nPress Enter to continue...");
    getchar(); getchar();
}

void searchStudent() {
    FILE *fp = fopen(FILE_NAME, "rb");
    struct Student s;
    int roll, found = 0;

    clearScreen();
    printTitle();

    printf("Enter Roll Number to Search: ");
    scanf("%d", &roll);

    while (fread(&s, sizeof(s), 1, fp)) {
        if (s.roll == roll) {
            printf("\n Student Found!\n");
            printLine();
            printf("Roll  : %d\n", s.roll);
            printf("Name  : %s\n", s.name);
            printf("Marks : %.2f\n", s.marks);
            printLine();
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("\n Student Not Found!\n");
    }

    fclose(fp);

    printf("\nPress Enter to continue...");
    getchar(); getchar();
}

void menu() {
    int choice;

    while (1) {
        clearScreen();
        printTitle();

        printf("1. Add Student\n");
        printf("2. View Students\n");
        printf("3. Search Student\n");
        printf("4. Exit\n");

        printLine();
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addStudent();
                break;
            case 2:
                viewStudents();
                break;
            case 3:
                searchStudent();
                break;
            case 4:
                printf("\n Exiting... Thank you!\n");
                exit(0);
            default:
                printf("\n Invalid Choice!");
                getchar(); getchar();
        }
    }
}

// MAIN FUNCTION
int main() {
    menu();
    return 0;
}