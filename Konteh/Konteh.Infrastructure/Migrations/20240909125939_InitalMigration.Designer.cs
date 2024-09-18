﻿// <auto-generated />
using System;
using Konteh.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Konteh.Infrastructure.Migrations;

[DbContext(typeof(KontehDbContext))]
[Migration("20240909125939_InitalMigration")]
partial class InitalMigration
{
    /// <inheritdoc />
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.8")
            .HasAnnotation("Relational:MaxIdentifierLength", 128);

        SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

        modelBuilder.Entity("AnswerExamQuestion", b =>
            {
                b.Property<int>("ExamQuestionId")
                    .HasColumnType("int");

                b.Property<int>("SelectedAnswersId")
                    .HasColumnType("int");

                b.HasKey("ExamQuestionId", "SelectedAnswersId");

                b.HasIndex("SelectedAnswersId");

                b.ToTable("AnswerExamQuestion");
            });

        modelBuilder.Entity("Konteh.Domain.Answer", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<bool>("IsCorrect")
                    .HasColumnType("bit");

                b.Property<int?>("QuestionId")
                    .HasColumnType("int");

                b.Property<string>("Text")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.HasKey("Id");

                b.HasIndex("QuestionId");

                b.ToTable("Answers");
            });

        modelBuilder.Entity("Konteh.Domain.Candidate", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<string>("Email")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("Name")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("Surname")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.HasKey("Id");

                b.ToTable("Candidates");
            });

        modelBuilder.Entity("Konteh.Domain.Exam", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<int>("CandidateId")
                    .HasColumnType("int");

                b.HasKey("Id");

                b.HasIndex("CandidateId");

                b.ToTable("Exams");
            });

        modelBuilder.Entity("Konteh.Domain.ExamQuestion", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<int?>("ExamId")
                    .HasColumnType("int");

                b.Property<int>("QuestionId")
                    .HasColumnType("int");

                b.HasKey("Id");

                b.HasIndex("ExamId");

                b.HasIndex("QuestionId");

                b.ToTable("ExamQuestions");
            });

        modelBuilder.Entity("Konteh.Domain.Question", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<int>("Category")
                    .HasColumnType("int");

                b.Property<string>("Text")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<int>("Type")
                    .HasColumnType("int");

                b.HasKey("Id");

                b.ToTable("Questions");
            });

        modelBuilder.Entity("AnswerExamQuestion", b =>
            {
                b.HasOne("Konteh.Domain.ExamQuestion", null)
                    .WithMany()
                    .HasForeignKey("ExamQuestionId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("Konteh.Domain.Answer", null)
                    .WithMany()
                    .HasForeignKey("SelectedAnswersId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

        modelBuilder.Entity("Konteh.Domain.Answer", b =>
            {
                b.HasOne("Konteh.Domain.Question", null)
                    .WithMany("Answers")
                    .HasForeignKey("QuestionId");
            });

        modelBuilder.Entity("Konteh.Domain.Exam", b =>
            {
                b.HasOne("Konteh.Domain.Candidate", "Candidate")
                    .WithMany()
                    .HasForeignKey("CandidateId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Candidate");
            });

        modelBuilder.Entity("Konteh.Domain.ExamQuestion", b =>
            {
                b.HasOne("Konteh.Domain.Exam", null)
                    .WithMany("ExamQuestions")
                    .HasForeignKey("ExamId");

                b.HasOne("Konteh.Domain.Question", "Question")
                    .WithMany()
                    .HasForeignKey("QuestionId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Question");
            });

        modelBuilder.Entity("Konteh.Domain.Exam", b =>
            {
                b.Navigation("ExamQuestions");
            });

        modelBuilder.Entity("Konteh.Domain.Question", b =>
            {
                b.Navigation("Answers");
            });
#pragma warning restore 612, 618
    }
}
