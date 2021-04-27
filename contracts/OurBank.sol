// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OurBank {
    bool public isPublic;
    address private owner;
    struct User {
        bool enrolled;
        uint256 balance;
    }
    event Enrolled(address _user);
    mapping(address => User) user;

    constructor(bool _isPublic) {
        isPublic = _isPublic;
        owner = msg.sender;
        enroll(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyEnrolled(address _user) {
        require(user[_user].enrolled == true, "Only enrolled");
        _;
    }

    function enroll(address _user) public onlyOwner {
        user[_user] = User(true, 0);
        emit Enrolled(_user);
    }

    function isEnrolled(address _user) public view returns(bool) {
        return user[_user].enrolled;
    }

    function deposit() public payable onlyEnrolled(msg.sender) {
        user[msg.sender].balance += msg.value;
    }

    function withdraw(uint256 _amount) public onlyEnrolled(msg.sender) {
        user[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() public view onlyEnrolled(msg.sender) returns (uint256) {
        return user[msg.sender].balance;
    }

    function getBalance(address _user) public view onlyOwner returns (uint256) {
        return user[_user].balance;
    }
}
