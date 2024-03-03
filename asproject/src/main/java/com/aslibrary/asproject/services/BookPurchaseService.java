package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.entities.BookPurchase;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.repositories.BookPurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookPurchaseService {

    @Autowired
    private BookPurchaseRepository bookPurchaseRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private MemberCardService memberCardService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    public BookPurchaseService(BookPurchaseRepository bookPurchaseRepository, BookService bookService,CustomerService customerService) {
        this.bookPurchaseRepository = bookPurchaseRepository;
        this.bookService = bookService;
        this.customerService = customerService;
    }

    public BookPurchase saveBookPurchase(Book book,Customer customer, MemberCard customerCard,Integer quantity){
        BookPurchase savedBookPurchase = new BookPurchase();
        savedBookPurchase.setIdBook(book);
        savedBookPurchase.setIdCustomer(customer);
        savedBookPurchase.setIdMemberCard(customerCard.getId());
        savedBookPurchase.setTotalPrice(book.getPrice()*quantity);
        bookPurchaseRepository.save(savedBookPurchase);
        return savedBookPurchase;
    }

    @Transactional
    public void buyBook(Integer quantity,Integer bookId, Integer idCustomer) {
        Optional<Customer> optionalCustomer = customerService.findById(idCustomer);
        Optional<Book> optionalBook = bookService.findBookById(bookId);
        if (optionalCustomer.isPresent() && optionalBook.isPresent()){
            Customer customer = optionalCustomer.get();
            MemberCard customerCard = customer.getIdMemberCard();
            Book book = optionalBook.get();
            if (book.getStock()>=quantity) {
                if (customerCard.getBalance() < book.getPrice()*quantity) {
                    throw new RuntimeException("Out of credit");
                }
                    BookPurchase bookPurchase = saveBookPurchase(book,customer,customerCard,quantity);
                    Integer stock = book.getStock()-quantity;
                    book.setStock(stock);
                    customerCard.setBalance(customerCard.getBalance() - bookPurchase.getTotalPrice());
                    bookService.saveBook(book);
                    memberCardService.saveCard(customerCard);
            }
            else{
                throw new RuntimeException("Out of Stock");
            }
        }
        else {
            throw new RuntimeException("DataNotFound");
        }

    }


}

