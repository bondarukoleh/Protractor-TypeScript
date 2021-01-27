### Testing stages:
#### Unit Testing
A unit test exercises the smallest piece of testable software in the application to determine whether it behaves as expected
The size of the unit under test is not strictly defined, however unit tests are typically written at the class level
or around a small group of related classes. The smaller the unit under test the easier it is to express the behaviour
using a unit test since the branch complexity of the unit is lower.

Often, difficulty in writing a unit test can highlight when a module should be broken down into independent more
coherent pieces and tested individually. Thus, alongside being a useful testing strategy, unit testing is also a
powerful design tool, especially when combined with test driven development.

With unit testing, you see an important distinction based on whether the unit under test is isolated from its
collaborators.

**Sociable** unit testing focuses on testing the behaviour of modules by observing changes in their state.
This treats the unit under test as a _black box_ tested entirely through its interface. \
**Solitary** unit testing looks at the interactions and collaborations between an object and its dependencies,
which are replaced by test doubles*.

#### Integration Testing
An integration test verifies the communication paths and interactions between components to detect interface defects. \
Integration tests collect modules together and test them as a subsystem in order to verify that they collaborate as
intended to achieve some larger piece of behaviour. They exercise communication paths through the subsystem to check
for any incorrect assumptions each module has about how to interact with its peers.

This is in contrast to unit tests where, even if using real collaborators, the goal is to closely test the behaviour
of the unit under test, not the entire subsystem.

Whilst tests that integrate components or modules can be written at any granularity, in microservice architectures they
are typically used to verify interactions between layers of integration code, and the external components to which they
are integrating. \
Examples of the kinds of external components against which such integration tests can be useful include other
microservices, data stores and caches.

#### Component Testing
A component test limits the scope of the exercised software to a portion of the system under test, manipulating the
system through internal code interfaces and using test doubles to isolate the code under test from other components. \
A component is any well-encapsulated, coherent and independently replaceable part of a larger system.

Testing such components in isolation provides a number of benefits. By limiting the scope to a single component, it is
possible to thoroughly acceptance test the behaviour encapsulated by that component whilst maintaining tests that
execute more quickly than broad stack equivalents.

Isolating the component from its peers using test doubles avoids any complex behaviour they may have. It also helps
to provide a controlled testing environment for the component, triggering any applicable error cases repeatably.

In a microservice architecture, the components are the services themselves. By writing tests at this granularity,
the contract of the API is driven through tests from the perspective of a consumer. Isolation of the service is achieved
by replacing external collaborators with test doubles and by using internal API endpoints to probe or configure the 
service.

The implementation of such tests includes a number of options. Should the test execute in the same process as the
service or out of process over the network? Should test doubles lie inside the service or externally, reached over
the network? Should a real datastore be used or replaced with an in-memory alternative?

#### Contract Testing
An integration contract test is a test at the boundary of an external service verifying that it meets the contract 
expected by a consuming service. \
Whenever some consumer couples to the interface of a component to make use of its behaviour, a contract is formed between
them. This contract consists of expectations of input and output data structures, side effects and performance and
concurrency characteristics. \
Each consumer of the component forms a different contract based on its requirements. If the component is subject to
change over time, it is important that the contracts of each of the consumers continue to be satisfied. \
Integration contract tests provide a mechanism to explicitly verify that a component meets a contract.

When the components involved are microservices, the interface is the public API exposed by each service.
The maintainers of each consuming service write an independent test suite that verifies only those aspects of the
producing service that are in use.

These tests are not component tests. They do not test the behaviour of the service deeply but that the inputs and
outputs of service calls contain required attributes and that response latency and throughput are within acceptable
limits. \
Ideally, the contract test suites written by each consuming team are packaged and runnable in the build pipelines for
the producing services. In this way, the maintainers of the producing service know the impact of their changes on
their consumers.

#### End to End Testing
An end-to-end test verifies that a system meets external requirements and achieves its goals, testing the entire
system, from end to end. \
In contrast to other types of test, the intention with end-to-end tests is to verify that the system as a whole meets
business goals irrespective of the component architecture in use. \
In order to achieve this, the system is treated as a black box and the tests exercise as much of the fully deployed
system as possible, manipulating it through public interfaces such as GUIs and service APIs.

As a microservice architecture includes more moving parts for the same behaviour, end-to-end tests provide value by
adding coverage of the gaps between the services. This gives additional confidence in the correctness of messages 
passing between the services but also ensures any extra network infrastructure such as firewalls, proxies or
load-balancers is correctly configured.

End-to-end tests also allow a microservice architecture to evolve over time. As more is learnt about the problem domain,
services are likely to split or merge and end-to-end tests give confidence that the business functions provided by the
system remain intact during such large scale architectural refactoring.

***Test Double** is a generic term for any case where you replace a production object for testing purposes:
 - *Dummy* objects are passed around but never actually used. Usually they are just used to fill parameter lists.
 - *Fake* objects actually have working implementations, but usually take some shortcut which makes them not suitable 
   for production (an InMemoryTestDatabase is a good example).
 - *Stubs* provide canned answers to calls made during the test, usually not responding at all to anything outside
   what's programmed in for the test.
 - *Spies* are stubs that also record some information based on how they were called. One form of this might be an 
   email service that records how many messages it was sent.
 - *Mocks* are pre-programmed with expectations which form a specification of the calls they are expected to receive.
   They can throw an exception if they receive a call they don't expect and are checked during verification to ensure
   they got all the calls they were expecting.